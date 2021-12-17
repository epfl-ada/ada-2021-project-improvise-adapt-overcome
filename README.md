# Project outline

## Title

A journey into Quotebank communities

## Abstract

News sources today are diverse: newspapers, radio stations, websites and more. They are also widely accessible. The internet has allowed us to collect news from all around the world, covering practically any topic. From anywhere, we can read Russian sports news and hear about the latest celebrity gossip from Argentina.

The goal of this project is to organize these news outlets into communities and then analyze the attributes of the resulting communities
using external datasets. Some of the factor we want to examine are geolocation,
interviewees, owner, size, focus, etc.

## Research questions

- Can we find a meaningful way to group news outlets?
- Once found, is there a way to find which attributes characterize these groups?
- Do some attributes strongly predict how groups are formed?
- Can we visually convey the identity of such groups?


## Additional datasets

- Wikidata, for publishers and speaker information 
- A dataset of connecting words, to filter them out when trying to extract the
  topic out of a quote

## Methods


- Kmeans
- DBScan
- Latent Dirichlet Allocation (topic extraction)
- Classification methods such as Logistic regression or random forest

## Notebooks

We explore two different ways to identify communities : using vector based
methods and using network based methods. Our pipeline is split in multiple
notebooks:

1. Wikidata URL<->News agency id extraction:
   [`src/wikidata-handling.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/wikidata-handling.ipynb)
2. Analysis, transformation and cleaning of Quotebank:
   [`src/handling_quotes_bank.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/handling_quotes_bank.ipynb)
3. Clustering methods exploration:
   [`src/clustering.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/clustering.ipynb)
4. Describing quotes using LDA:
   [`src/lda.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/lda.ipynb)
5. Semantic analysis of clusters:
   [`src/semantic_analysis.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/Semantic Analysis.ipynb)
6. Analysis of cluster features:
   [`src/features_analysis.ipynb`](https://github.com/epfl-ada/ada-2021-project-improvise-adapt-overcome/blob/master/src/feature_importance_analysis.ipynb)

## Data story outline

The main idea is to present the different clusters that we have identified and
what defines them. We'll have a main visualization of our clusters, followed by
detailed analysis of some individual clusters. We would like our main
visualization to be interactive: the user should be able to click on clusters
and examine their properties.

## Timeline

- [12.11] Merge pipeline stages, make sure full pipeline works correctly
          Create a small library of useful functions for the project
- [19.11] Explore and analyze the initial results, and dig where interesting things happen
- [03.12] Start working on data story and possible visualizations
- [10.12] Finalize data story and create blog post

## Team organization

Team assignments:
- Erwan: data cleaning, clustering using graphs
- Julian: working on page rank, topic extraction
- Luca: preparing additional datasets and visualisation 
- Sylvain: clustering (Kmeans, DBScan, ...) and blog

## Questions for TAs

- Using pagerank: how to design the graph on which to apply it ? Is it useful for our goal ?
- Interactive visualization: any libraries suited for the task ?
- Do you have any concerns on feasibility ?

