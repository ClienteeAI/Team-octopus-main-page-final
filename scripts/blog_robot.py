import os
import re
import json
import requests
import datetime
import sys
from pathlib import Path
from dotenv import load_dotenv

# Force UTF-8 encoding for stdout to handle Czech characters on Windows
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# Try to import openai, but don't fail immediately so we can show message to user
try:
    from openai import OpenAI
except ImportError:
    print("Error: 'openai' library not found. Run: pip install openai python-dotenv requests")

# Load environment variables
load_dotenv()

# --- CONFIGURATION ---
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ARTICLES_FILE = Path("src/data/articles.ts")
IMAGES_DIR = Path("public/blog")
PROJECT_ROOT = Path(__file__).parent.parent

# --- TOPICS POOL ---
HR_TOPICS = [
    "Jak napsat inzerát, který přitáhne ty správné lidi",
    "Onboarding: Prvních 90 dní nového zaměstnance",
    "Jak správně číst v životopisech a poznat 'red flags'",
    "Kariérní web jako výkladní skříň vaší firmy",
    "Moderní trendy v náboru pro rok 2026",
    "Jak vést pracovní pohovor, aby se kandidát cítil dobře",
    "Zaměstnanecké benefity: Co dnes lidé skutečně chtějí?",
    "Role firemní kultury v náborovém procesu",
    "Jak si udržet talenty v konkurenčním prostředí",
    "Employer Branding: Jak být vidět na trhu práce"
]

class BlogRobot:
    def __init__(self, api_key):
        self.client = OpenAI(api_key=api_key)

    def generate_article(self):
        print("Generuji tema a obsah clanku...")
        topic = HR_TOPICS[datetime.datetime.now().day % len(HR_TOPICS)]
        
        prompt = f"""
        Jsi expert na Human Resources a nábor zaměstnanců. Napiš hloubkový, detailní vzdělávací článek na téma: "{topic}".
        
        Požadavky:
        1. Jazyk: Profesionální, ale velmi čtivá čeština.
        2. Struktura: Nadpis (H2), detailní úvod, několik hlavních sekcí s podnadpisy (H3), seznamy (UL/LI), praktické příklady a závěr.
        3. Formát: HTML tagy (h2, h3, p, ul, li, strong).
        4. Obsah: Článek MUSÍ být velmi dlouhý (alespoň 1000 slov). Jdi do hloubky, rozebírej psychologii, procesy, časté chyby a osvědčené postupy.
        5. Cíl: Čtenář by měl mít pocit, že se naučil vše podstatné o daném tématu. Čtení by mělo zabrat alespoň 6-8 minut.
        
        Vrať výsledek v JSON formátu s těmito klíči:
        - title: Atraktivní nadpis článku
        - excerpt: Poutavý úvod (cca 3-4 věty)
        - content: Celý HTML obsah článku (minimálně 1000 slov)
        - category: Jedno slovo (např. Nábor, Kariéra, Management)
        - readTime: "8 min čtení"
        """

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        article_data = json.loads(response.choices[0].message.content)
        article_data['date'] = self._get_czech_date()
        article_data['id'] = self._generate_id(article_data['title'])
        
        return article_data

    def generate_image(self, title):
        print(f"Generuji obrazek pro: {title}...")
        prompt = f"Professional high-quality business photography for an HR blog post titled '{title}'. Modern office setting, diverse people, warm lighting, premium aesthetic, 4k."
        
        response = self.client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1
        )
        
        image_url = response.data[0].url
        return image_url

    def download_image(self, image_url, article_id):
        if not IMAGES_DIR.exists():
            IMAGES_DIR.mkdir(parents=True)
            
        filename = f"{article_id}.png"
        filepath = IMAGES_DIR / filename
        
        print(f"Stahuji obrazek do {filepath}...")
        img_data = requests.get(image_url).content
        with open(filepath, 'wb') as handler:
            handler.write(img_data)
            
        return f"/blog/{filename}"

    def update_articles_ts(self, new_article):
        print(f"Aktualizuji {ARTICLES_FILE}...")
        with open(ARTICLES_FILE, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the articles array
        match = re.search(r'export const articles: Article\[\] = \[(.*?)\];', content, re.DOTALL)
        if not match:
            print("❌ Chyba: Nepodařilo se najít pole 'articles' v souboru.")
            return

        existing_articles_str = match.group(1).strip()
        
        # Prepare the new article string (indented)
        new_article_str = f"""  {{
    id: "{new_article['id']}",
    title: "{new_article['title']}",
    excerpt: "{new_article['excerpt']}",
    date: "{new_article['date']}",
    readTime: "{new_article['readTime']}",
    category: "{new_article['category']}",
    image: "{new_article['image']}",
    content: `{new_article['content']}`
  }},"""

        # Update the file content
        new_content = content.replace(
            f"export const articles: Article[] = [",
            f"export const articles: Article[] = [\n{new_article_str}"
        )

        with open(ARTICLES_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print("✅ Hotovo! Článek byl přidán.")

    def _get_czech_date(self):
        now = datetime.datetime.now()
        months = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"]
        return f"{now.day}. {months[now.month-1]} {now.year}"

    def _generate_id(self, title):
        # Basic slugify
        slug = title.lower().replace(" ", "-")
        slug = re.sub(r'[^a-z0-9-]', '', slug)
        return slug

def main():
    if not OPENAI_API_KEY:
        print("Chyba: Chybí API klíč v .env souboru (OPENAI_API_KEY).")
        return

    robot = BlogRobot(OPENAI_API_KEY)
    
    try:
        # 1. Generate Content
        article = robot.generate_article()
        
        # 2. Generate Image
        img_url = robot.generate_image(article['title'])
        
        # 3. Save Image
        article['image'] = robot.download_image(img_url, article['id'])
        
        # 4. Update Website Data
        robot.update_articles_ts(article)
        
    except Exception as e:
        print(f"Doslo k chybe: {e}")

if __name__ == "__main__":
    main()
