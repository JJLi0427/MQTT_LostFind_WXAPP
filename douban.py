import requests
from bs4 import BeautifulSoup as bs
head = {
    "User-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4.1 Safari/605.1.15"
}
with open("./top250/豆瓣TOP250.txt", "a+", encoding = "UTF-8") as f:
    for num in range(0, 10):
        response = requests.get(f"https://movie.douban.com/top250?start={num*25}", headers = head)
        html = bs(response.text, "html.parser")
        titles = html.find_all("span", attrs={"class": "title"})
        imgs = html.find_all("img", width="100")
        for i,title in enumerate(titles):
            if '/' in title.string:
                del titles[i]
        id = 0
        for img in imgs:
            title = titles[id].string
            with open(f"./top250/No.{num*25+id+1}{title}.jpg", "wb+") as pw:
                photo = requests.get(img['src'], headers=head)
                pw.write(photo.content)
            id += 1
        for title in titles:
            f.write(f"{title.string}\n")
    f.close()