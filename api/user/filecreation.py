import pandas as pd
import os
import json
from pathlib import Path
#basedir = os.path.dirname("C:/Users/HP/project/capstone-project-comp9900-h12a-5star/web/src/searchdetails.js")
def rate(price):
    return round(price/2,1)
def rate1(description):
    s=description.split(" ")
    #print(s)
    return ''.join(s[:8])
def file_creation():
    path = Path(os.getcwd())
    #os.chdir("C:/Users/HP/Desktop")
    df = pd.read_csv(path.parents[0]/'tmdb_5000_movies.csv')
    df1 = pd.read_csv(path.parents[0]/'movies.csv')
    df1= df1.drop(df1.columns[[0,2]], axis=1)
    df1 = df1.rename(columns={'overview': 'description', 'poster_path': 'image'})
    #df1['price']=df['vote_average']
    #df1['price']=df1['price'].astype(str).astype(float)
    #df1['price']=df1['price'].apply(rate)
    df1['description']=df1['description'].astype(str)
    df1['description']=df1['description'].apply(rate1)
    #df1['price']=df1['price'].astype(str)
    x=df1.T.to_dict().values()
    #os.chdir("C:/Users/HP/project/capstone-project-comp9900-h12a-5star/web/src/")
    #path = Path(os.getcwd())
    #print(path.parents[0])
    data_folder = Path("web/src/searchdetails.js")
    if os.path.exists(path.parents[0]/data_folder):
        #print("now")
        os.remove(path.parents[0]/data_folder)
        with open(path.parents[0]/data_folder, "w") as f:
            json.dump(list(x),f)
        #f = open(str(path.parents[1])+"/web/src/searchdetails.js", "r")
        #print(f.read())
        f.close()
    else:
        #print("enter")
        with open(path.parents[0]/data_folder, "w") as f:
            json.dump(list(x),f)
        f.close()
