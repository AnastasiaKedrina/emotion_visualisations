# Source - https://stackoverflow.com/a
# Posted by Zach Kelling, modified by community. See post 'Timeline' for change history
# Retrieved 2025-11-20, License - CC BY-SA 4.0

import requests

# url = 'https://books.google.com/ngrams/json?content=emotional+intelligence&year_start=1800&year_end=2019&corpus=26&smoothing=3'
url = 'https://books.google.com/ngrams/json'

params = dict(
    content='emotional+intelligence',
    year_start='1800',
    year_end='2019',
    corpus='26',
    smoothing='3'
)

resp = requests.get(url=url, params=params)
data = resp.json() # Check the JSON Response Content documentation below
print(data)