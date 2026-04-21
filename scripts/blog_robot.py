import os
import datetime
import json
import requests
import re
import sys
from openai import OpenAI
from dotenv import load_dotenv

# Reconfigure stdout to handle UTF-8 for Czech characters
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()

# Configuration
ARTICLES_FILE = "src/data/articles.ts"
BLOG_IMAGE_DIR = "public/blog/"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

HR_TOPICS = [
    "Jak vytvořit náborový web, který skutečně prodává pracovní pozice",
    "Onboarding nového zaměstnance: Prvních 90 dní rozhoduje o úspěchu",
    "Jak správně číst v životopisech a odhalit skrytý potenciál",
    "Moderní inzeráty: Co v nich dnes nesmí chybět a co je přežitek",
    "Psychologie výběrového pohovoru: Jak se ptát a co skutečně sledovat",
    "Budování employer brandingu aneb proč k vám lidé (ne)chtějí nastoupit",
    "Jak napsat perfektní CV v roce 2026: Průvodce pro kandidáty",
    "Automatizace v HR: Role umělé inteligence v náboru",
    "Retence zaměstnanců: Jak si udržet ty nejlepší talenty ve firmě",
    "Kultura zpětné vazby jako nástroj pro růst celé organizace"
]

class BlogRobot:
    def __init__(self):
        if not OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY nebyl nalezen v .env souboru!")
        self.client = OpenAI(api_key=OPENAI_API_KEY)

    def get_existing_topics(self):
        if not os.path.exists(ARTICLES_FILE):
            return []
        
        try:
            with open(ARTICLES_FILE, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Simple regex to find titles in the TS file
            titles = re.findall(r'"title":\s*"([^"]+)"', content)
            return list(set(titles))
        except Exception as e:
            print(f"Chyba při čtení existujících témat: {e}")
            return []

    def generate_article(self):
        # Extract existing topics to avoid repetition
        existing_topics = self.get_existing_topics()
        print(f"Nalezeno {len(existing_topics)} existujících článků.")

        # Ask AI for a new, unique topic
        topic_prompt = f"""
        Jsi špičkový HR trend-setter a editor blogu. 
        Tvým úkolem je vymyslet JEDNO nové, vysoce zajímavé a aktuální téma pro HR blog v roce 2026.
        
        Už jsme napsali články na tato témata: {existing_topics}
        
        Pravidla:
        1. Téma MUSÍ být odlišné od těch, co už máme.
        2. Musí to být "hot topic" moderní personalistiky (AI, hybridní práce, psychologie, automatizace, nová legislativa, netradiční nábor atd.).
        3. Téma musí být v češtině.
        4. Musí z něj jít napsat článek o 1000+ slovech.
        
        Zvol to nejzajímavější téma, které v seznamu chybí.
        Vrať pouze JSON s klíčem 'topic'.
        """
        
        topic_res = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "Jsi expert na budoucnost práce a HR trendy."},
                      {"role": "user", "content": topic_prompt}],
            response_format={"type": "json_object"}
        )
        topic = json.loads(topic_res.choices[0].message.content).get('topic')
        print(f"AI vybralo nové téma: {topic}")

        # STEP 1: Generate Detailed Outline
        outline_prompt = f"""
        Jsi expert na HR a SEO. Vytvoř detailní osnovu pro hloubkový vzdělávací článek na téma: "{topic}".
        Osnova musí obsahovat:
        1. Poutavý SEO titulek (H2)
        2. Detailní úvod
        3. Alespoň 5 hlavních sekcí (H3), které jdou do hloubky
        4. Podsekce (H4) pro každou hlavní sekci
        5. Závěr s praktickými kroky
        
        Vrať pouze JSON se seznamem 'sections', kde každý prvek má 'title' a 'description' (co v té sekci má být).
        """
        
        outline_res = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "Jsi zkušený HR ředitel a copywriter."},
                      {"role": "user", "content": outline_prompt}],
            response_format={"type": "json_object"}
        )
        outline = json.loads(outline_res.choices[0].message.content)
        
        # STEP 2: Generate Content for each section
        full_content = ""
        actual_sections = outline.get('sections', [])
        print(f"Osnova připravena ({len(actual_sections)} sekcí). Začínám psát obsah...")

        for i, section in enumerate(actual_sections):
            s_title = section.get('title', f'Sekce {i+1}')
            s_desc = section.get('description', section.get('desc', section.get('details', 'Detailní rozbor tématu')))
            
            print(f"  Píšu sekci {i+1}: {s_title}...")
            content_prompt = f"""
            Téma článku: {topic}
            Sekce k napsání: {s_title}
            Co v sekci pokrýt: {s_desc}
            
            Pravidla:
            1. Používej HTML tagy (p, h3, h4, ul, li, strong).
            2. Piš v profesionální, ale čtivé češtině.
            3. Tato sekce MUSÍ být velmi dlouhá (alespoň 250-300 slov). Buď velmi konkrétní, rozebírej detaily, uváděj příklady.
            4. Neopakuj se.
            """
            
            sect_res = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "system", "content": "Jsi nejlepší český HR blogger. Píšeš odborně a do hloubky."},
                          {"role": "user", "content": content_prompt}]
            )
            full_content += sect_res.choices[0].message.content + "\n\n"

        # STEP 3: Generate Title, Excerpt and Meta
        meta_prompt = f"Na základě tohoto obsahu vytvoř JSON s klíči 'title', 'excerpt' (3 věty) a 'category'.\n\nObsah:\n{full_content[:1000]}"
        meta_res = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": meta_prompt}],
            response_format={"type": "json_object"}
        )
        meta = json.loads(meta_res.choices[0].message.content)

        word_count = len(re.findall(r'\w+', full_content))
        read_time = f"{max(8, word_count // 150)} min čtení"

        article_data = {
            "title": meta.get("title", topic),
            "excerpt": meta.get("excerpt", ""),
            "content": full_content,
            "category": meta.get("category", "Nábor"),
            "readTime": read_time,
            "wordCount": word_count
        }
        
        print(f"Článek dokončen. Počet slov: {word_count}")
        return article_data

    def generate_image(self, title):
        print(f"Generuji obrázek pro: {title}...")
        prompt = f"Professional high-quality business/HR photography, modern office environment, focus on human interaction or modern technology, clean aesthetic, complementary to the topic: {title}. Realistic, premium feel."
        
        response = self.client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1
        )
        return response.data[0].url

    def slugify(self, text):
        text = text.lower()
        text = re.sub(r'[áčďéěíňóřšťúůýž]', lambda m: {
            'á':'a','č':'c','ď':'d','é':'e','ě':'e','í':'i','ň':'n','ó':'o','ř':'r','š':'s','ť':'t','ú':'u','ů':'u','ý':'y','ž':'z'
        }[m.group()], text)
        text = re.sub(r'[^a-z0-9]+', '-', text)
        return text.strip('-')

    def run(self):
        article = self.generate_article()
        
        # Check word count - retry if too low
        if article['wordCount'] < 900:
            print("VAROVÁNÍ: Článek je příliš krátký. Zkouším vygenerovat ještě jednou...")
            return self.run()

        image_url = self.generate_image(article['title'])
        
        slug = self.slugify(article['title'])
        image_path = f"{BLOG_IMAGE_DIR}{slug}.png"
        
        print(f"Stahuji obrázek do {image_path}...")
        img_data = requests.get(image_url).content
        with open(image_path, 'wb') as handler:
            handler.write(img_data)

        # Update articles.ts
        print(f"Aktualizuji {ARTICLES_FILE}...")
        with open(ARTICLES_FILE, 'r', encoding='utf-8') as f:
            content = f.read()

        # Clean content from markdown fences if any
        clean_content = article['content'].strip()
        if clean_content.startswith("```html"):
            clean_content = clean_content[7:]
        if clean_content.endswith("```"):
            clean_content = clean_content[:-3]
        clean_content = clean_content.strip()

        # Final string replacements for TS safety
        clean_content = clean_content.replace("`", "'").replace("${", "\\${")

        new_entry = {
            "id": slug,
            "title": article['title'],
            "excerpt": article['excerpt'],
            "date": datetime.datetime.now().strftime("%d. dubna %Y").lstrip("0"),
            "readTime": article['readTime'],
            "category": article['category'],
            "image": f"/blog/{slug}.png",
            "content": clean_content
        }

        json_entry = json.dumps(new_entry, indent=2, ensure_ascii=False)
        # Add indentation
        json_entry = "\n  " + json_entry.replace("\n", "\n  ") + ","
        
        # Insert at the beginning of the array
        new_content = content.replace("export const articles: Article[] = [", f"export const articles: Article[] = [{json_entry}")
        
        with open(ARTICLES_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print("✅ Hotovo! Článek byl přidán.")

if __name__ == "__main__":
    robot = BlogRobot()
    robot.run()
