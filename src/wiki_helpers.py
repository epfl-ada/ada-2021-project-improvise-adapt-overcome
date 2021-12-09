import pywikibot as pw

def download_wiki_entry(qid):
    if isinstance(qid, float):
        return "", [] 
    
    try:
        site = pw.Site("wikidata", "wikidata")
        repo = site.data_repository()

        item = pw.ItemPage(repo, qid).get()
        desc = item.get("descriptions", {}).get('en', "")
        claims = item["claims"].toJSON()

        return desc, claims
    except KeyboardInterrupt:
        raise KeyboardInterrupt
    except:
        print(f"Failed at {qid}")
        return "", []


def get_item_claims_from_wiki(qid):    
    _, claims = download_wiki_entry(qid)
    
    return claims 


class Property:
    def __init__(self, prop_id, label, is_item=True, extractor=None):
        self.prop_id = prop_id
        self.label = label
        self.is_item = is_item
        self.extractor = extractor
        
    def extract(self, raw_prop_value):
        if self.extractor:
            return self.extractor(raw_prop_value)
        elif self.is_item:
            return "Q" + str(raw_prop_value.get("numeric-id"))
        else:
            return raw_prop_value
            
    def find_online(self, qid, repo=None):
        claims = get_item_claims_from_wiki(qid)
        return self.find_in_claims(claims)
        
    def find_in_claims(self, claims):
        if len(claims) == 0:
            return []
    
        prop = claims.get(self.prop_id, [])
        values = []
    
        for val in prop:
            value = val.get('mainsnak', {}) \
                       .get("datavalue", {}) \
                       .get("value", None)
            
            if value:
                values.append(self.extract(value))
        
        return values