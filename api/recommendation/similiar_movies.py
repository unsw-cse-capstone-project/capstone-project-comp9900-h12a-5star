import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import os
from pathlib import Path

def get_recommendations(description):
    path = Path(os.getcwd())
    #os.chdir("C:/Users/HP/Desktop")
    print('-----------------',list(path.parents))
    df2 = pd.read_csv(path.parents[0]/'api/recommendation/tmdb_5000_movies.csv')
    df1 = pd.read_csv(path.parents[0]/'api/recommendation/tmdb_5000_credits.csv')
    print(df2.shape)


    #df1=pd.read_csv(path.parents[0]/'api/recommedation/tmdb_5000_credits.csv')
    #df2=pd.read_csv(path.parents[0]/'api/recommendation/tmdb_5000_movies.csv')

    df1.columns = ['id','tittle','cast','crew']
    df2= df2.merge(df1,on='id')
    df2 = df2.loc[:, ['id','title','overview','vote_average','poster_path','release_date']]
    print(df2.head())
    df2['index'] = df2.index

    row = [0000, '####', description,0,None,None,len(df2)]
    df2.loc[len(df2)] = row

    tfidf = TfidfVectorizer(stop_words='english')
    df2['overview'] = df2['overview'].fillna('')
    tfidf_matrix = tfidf.fit_transform(df2['overview'])
    print(tfidf_matrix.shape)

    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    #indices = pd.Series(df2.index, index=df2['title']).drop_duplicates()

    sim_scores = list(enumerate(cosine_sim[4803]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:12]
    movie_indices = [i[0] for i in sim_scores]

    return df2.iloc[movie_indices].to_json(orient="split")

