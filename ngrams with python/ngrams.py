from google_ngrams import google_ngram, TimeSeries


word = "эмоция"
xray_year = google_ngram(word_forms = ["emotion"], variety = "us", by = "year")

print(type(xray_year))
