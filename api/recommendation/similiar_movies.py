import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import os, json
from pathlib import Path

def get_recommendations(description):
    path = Path(os.getcwd())

    df2 = pd.read_csv(path.parents[0]/'api/recommendation/tmdb_5000_movies.csv')
    df1 = pd.read_csv(path.parents[0]/'api/recommendation/tmdb_5000_credits.csv')

    df1.columns = ['id','tittle','cast','crew']
    df2= df2.merge(df1,on='id')
    df2 = df2.loc[:, ['id','title','overview','vote_average','poster_path','release_date']]
    df2['index'] = df2.index

    row = [0000, '####', description,0,None,None,len(df2)]
    df2.loc[len(df2)] = row

    tfidf = TfidfVectorizer(stop_words='english')
    df2['overview'] = df2['overview'].fillna('')
    tfidf_matrix = tfidf.fit_transform(df2['overview'])
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    sim_scores = list(enumerate(cosine_sim[4803]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[2:13]
    movie_indices = [i[0] for i in sim_scores]

    return df2.iloc[movie_indices].to_json(orient="split")


def get_preferences(genres, languages=[], directors=[]):
    path = Path(os.getcwd())
    df2 = pd.read_csv(path.parents[0]/'api/recommendation/tmdb_5000_movies.csv')
    df1 = pd.read_csv(path.parents[0]/'api/recommendation/tmdb_5000_credits.csv')

    df1.columns = ['id','tittle','cast','crew']
    if len(directors) != 0:
        df1['director'] = df1['crew'].apply(lambda x:[[i['name'].lower(),i['job'].lower()] for i in json.loads(x)])
        df1['director'] = df1['director'].apply(lambda x:[i[0] for i in x if i[1]=='director'])

    df2= df2.merge(df1,on='id')
    df2 = df2.loc[:, ['id','original_title','overview','vote_average','poster_path','release_date','genres','spoken_languages','director']]
    df2 = df2.sort_values(['vote_average'],ascending=False)

    if len(genres) != 0:
        df2['genres'] = df2['genres'].apply(lambda x:[i['name'].lower() for i in json.loads(x)])
        df2 = df2[df2['genres'].apply(lambda x:True if len(set(x).intersection(genres))!= 0 else False)]

    if len(directors) != 0:
        df2 = df2[df2['director'].apply(lambda x:True if len(set(x).intersection(directors))!= 0 else False)]

    return json.loads(df2.loc[:, ['id','original_title','overview','vote_average','poster_path','release_date']].head().to_json(orient="split"))['data']
