# Project outline

Link to the project: [Improvise, ADApt, Overcome 2021](https://ada2021.sylvainkuchen.net)

## Title

A journey into Quotebank communities

## Abstract

News sources today are diverse: newspapers, radio stations, websites and more. They are also widely accessible. The internet has allowed us to collect news from all around the world, covering practically any topic. From anywhere, we can read Russian sports news and hear about the latest celebrity gossip from Argentina.

The goal of this project is to organize these news outlets into communities and then analyze the attributes of the resulting communities
using external datasets. Some of the factor we want to examine are geolocation, interviewees, owner, size, focus, etc.

We use the Quotebank dataset to cluster news outlets by the speakers they quoted. Once clustered, we analyse each cluster based on news outlets features extracted from Wikidata. 

## Research questions

- Can we find a meaningful way to group news outlets?
- Once found, is there a way to find which attributes characterize these groups?
- Do some attributes strongly predict how groups are formed?
- Can we visually convey the identity of such groups?


## Additional datasets

- Wikidata, for publishers and speaker information 

## Methods

Dimentionality reduction to help clustering:
- Latent Semantic Analysis

Clustering algorithms to group news outlets:
- Kmeans
- DBScan

Find characteristic attributes from raw Wikidata:
- Latent Dirichlet Allocation (topic extraction)
- Semantic analysis with Empath

Find cluster predictors:
- Classification methods such as logistic regression or random forests

Visualization tools for clusters:
- three.js (3D representation)
- Leaflet (Geographical representation)


## Notebooks

Our pipeline is split in multiple notebooks:

1. News agency identification and feature extraction from Wikidata:
   [`src/wikidata-handling.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/wikidata-handling.ipynb)
2. Analysis, transformation and cleaning of Quotebank:
   [`src/handling_quotes_bank.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/handling_quotes_bank.ipynb)
3. Clustering methods exploration:
   [`src/clustering.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/clustering.ipynb)
4. Describing quotes using LDA:
   [`src/lda.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/lda.ipynb)
5. Semantic analysis of clusters:
   [`src/semantic_analysis.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/semantic_analysis.ipynb)
6. Analysis of cluster features:
   [`src/feature_importance_analysis.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/feature_importance_analysis.ipynb)

Additonally, the [`src/utilities`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/tree/master/src/utilities) folder contains notebooks used to generate the data for the datastory visualizations, and python files used as libraries:
1. Finding journal locations and adding that info to  the cluster file: 
[`src/utilities/cluster_location.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src//utilities/cluster_location.ipynb)
2. Finding the top speakers and top journals in each cluster: 
[`src/utilities/cluster-attributes.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src//utilities/cluster-attributes.ipynb)
3. Library to find the mean location from a list of coordinates: 
[`src/utilities/distances.py`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src//utilities/distances.py)
4. Library to extract data from Wikidata (online/local): 
[`src/utilities/wiki_helpers.py`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src//utilities/wiki_helpers.py)

## Data story outline

Our datastory will first introduce the problem, our research questions and the data. We will briefly detail our methodology along with elementary statistics about the dataset.  

The results of our analysis are presented in two interactive graphs. Each graph is accompanied by short insights we have found about our data.
- The first graph is a 3D projection of our clusters. The reader can click on the cluster labels to show details information about each cluster. The information includes the top news sources, most quoted speakers, and which features best predict the cluster 
- The second graph maps the news outlets geographically. The user can select which clusters to show on the map.

Finally, we analyse selected clusters in depth, and conclude with the overall insights of our analysis.

## Timeline

- [12.11] Merge pipeline stages, make sure full pipeline works correctly
          Create a small library of useful functions for the project
- [19.11] Explore and analyze the initial results, and dig where interesting things happen
- [03.12] Start working on data story and possible visualizations
- [10.12] Finalize data story and create blog post

## Team organization

Team assignments:
- Erwan: data cleaning, feature importance analysis, data story
- Julian: semantic analysis, lda, data story
- Luca: wikidata extraction, geographical visualization & cluster properties panel, data story
- Sylvain: clustering, 3D visualization, data story