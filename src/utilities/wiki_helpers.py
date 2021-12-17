import pywikibot as pw

def download_wiki_entry(qid):
    """Takes a Wikidata QID as input and fetches the corresponding
       Wikidata entry from the API. Returns a description of the item
       and a list of Wikidata property claims."""
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
    """Downloads the claims for a specific wikidata QID"""    
    _, claims = download_wiki_entry(qid)
    
    return claims 


class Property:
    """A Property object is a representation of a Wikidata property.
       It is represented by an identifier `prop_id`, and a label.
       This class provides utility functions for extracting the property
       from wikidata entries, online or on file"""

    def __init__(self, prop_id, label, is_item=True, extractor=None):
        """Initializes a new Property object, with identifier `prop_id` and `label`.
           The optional arg `extractor` is a function which takes a raw property object
           from wikidata and transforms it to extract a chosen value.
           If `is_item` is true, the system assumes the value we want to extract is a wikipedia QID. 
           It will apply a simple extractor to transform the raw property into a QID."""
        self.prop_id = prop_id
        self.label = label
        self.is_item = is_item
        self.extractor = extractor
        
    def extract(self, raw_prop_value):
        """Takes a raw property from Wikidata and applies `extractor` if defined, or extracts
           the value based on `is_item`. Returns the extracted value."""
        if self.extractor:
            return self.extractor(raw_prop_value)
        elif self.is_item:
            return "Q" + str(raw_prop_value.get("numeric-id"))
        else:
            return raw_prop_value
            
    def find_online(self, qid):
        """Extracts property values for `qid` from wikidata website"""
        claims = get_item_claims_from_wiki(qid)
        return self.find_in_claims(claims)
        
    def find_in_claims(self, claims):
        """Extracts property values from `claims` object"""
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