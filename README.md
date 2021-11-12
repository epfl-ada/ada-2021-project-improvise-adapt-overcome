# Project outline

## Title

Properties of communities in news outlets in Quotebank

## Abstract

The goal of the project is to highlight relationships between newspapers,
journalists and interviewees.  More precisely, we want to cluster media outlets
based on who they cite. We will then analyze the attributes of the resulting communities
using external datasets. Some of the factor we want to examine are geolocation,
interviewees, owner, size, focus, etc.

## Research questions

- Can we identify groups in Quotebank publishers using the people they cite ? 
- If there are such groups, what attributes define them ?

## Additional datasets

- Wikidata, for publishers and speaker information 
- A dataset of connecting words, to filter them out when trying to extract the
  topic out of a quote

## Methods

- Graph community detection (modularity based methods)
- Kmeans
- DBScan
- Page rank
- Latent Dirichlet Allocation (topic extraction)

## Notebooks

1. Wikidata URL<->News agency id extraction: `src/wikidata-handling.ipynb` 
2. Erwan
3. Sylvain
4. Describing quotes using LDA

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

