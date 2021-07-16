# -*- coding: utf-8 -*-
#Par Qiao Wang 20095140
import nltk
import string
import codecs
import json
from nltk.stem import SnowballStemmer
from nltk.corpus import stopwords
import math

def matrix2D():
    doclist=[]
    fr = SnowballStemmer('french')#snowball stemmer en francais
    #stopwords recuperer de https://countwordsfree.com/stopwords/french
    useless = [
        "a",
        "à",
        "â",
        "abord",
        "afin",
        "ah",
        "ai",
        "aie",
        "ainsi",
        "allaient",
        "allo",
        "allô",
        "allons",
        "après",
        "assez",
        "attendu",
        "au",
        "aucun",
        "aucune",
        "aujourd",
        "aujourd'hui",
        "auquel",
        "aura",
        "auront",
        "aussi",
        "autre",
        "autres",
        "aux",
        "auxquelles",
        "auxquels",
        "avaient",
        "avais",
        "avait",
        "avant",
        "avec",
        "avoir",
        "ayant",
        "b",
        "bah",
        "beaucoup",
        "bien",
        "bigre",
        "boum",
        "bravo",
        "brrr",
        "c",
        "ça",
        "ca",
        "cas",
        "car",
        "ce",
        "ceci",
        "cela",
        "celle",
        "celle-ci",
        "celle-là",
        "celles",
        "celles-ci",
        "celles-là",
        "celui",
        "celui-ci",
        "celui-là",
        "cent",
        "cependant",
        "certain",
        "certaine",
        "certaines",
        "certains",
        "certes",
        "ces",
        "cet",
        "cette",
        "ceux",
        "ceux-ci",
        "ceux-là",
        "chacun",
        "chaque",
        "cher",
        "chère",
        "chères",
        "chers",
        "chez",
        "chiche",
        "chut",
        "ci",
        "cinq",
        "cinquantaine",
        "cinquante",
        "cinquantième",
        "cinquième",
        "clac",
        "clic",
        "combien",
        "comme",
        "comment",
        "compris",
        "concernant",
        "contre",
        "contrairement",
        "couic",
        "crac",
        "d",
        "da",
        "dans",
        "de",
        "debout",
        "dedans",
        "dehors",
        "delà",
        "depuis",
        "derrière",
        "des",
        "dès",
        "désormais",
        "desquelles",
        "desquels",
        "dessous",
        "dessus",
        "deux",
        "deuxième",
        "deuxièmement",
        "devant",
        "devers",
        "devra",
        "différent",
        "différente",
        "différentes",
        "différents",
        "dire",
        "divers",
        "diverse",
        "diverses",
        "dix",
        "dix-huit",
        "dixième",
        "dix-neuf",
        "dix-sept",
        "doit",
        "doivent",
        "donc",
        "dont",
        "douze",
        "douzième",
        "dring",
        "du",
        "duquel",
        "durant",
        "e",
        "effet",
        "eh",
        "elle",
        "elle-même",
        "elles",
        "elles-mêmes",
        "en",
        "enfin",
        "ensuite",
        "encore",
        "entre",
        "envers",
        "environ",
        "es",
        "ès",
        "est",
        "et",
        "etant",
        "étaient",
        "étais",
        "était",
        "étant",
        "etc",
        "été",
        "etre",
        "être",
        "eu",
        "euh",
        "eux",
        "eux-mêmes",
        "excepté",
        "f",
        "façon",
        "fais",
        "faisaient",
        "faisant",
        "fait",
        "feront",
        "fi",
        "flac",
        "floc",
        "font",
        "g",
        "gens",
        "grâce",
        "h",
        "ha",
        "hé",
        "hein",
        "hélas",
        "hem",
        "hep",
        "hi",
        "ho",
        "holà",
        "hop",
        "hormis",
        "hors",
        "hou",
        "houp",
        "hue",
        "hui",
        "huit",
        "huitième",
        "hum",
        "hurrah",
        "i",
        "il",
        "ils",
        "importe",
        "j",
        "je",
        "jusqu",
        "jusque",
        "k",
        "l",
        "la",
        "là",
        "laquelle",
        "las",
        "le",
        "lequel",
        "les",
        "lès",
        "lesquelles",
        "lesquels",
        "leur",
        "leurs",
        "longtemps",
        "lorsque",
        "lui",
        "lui-même",
        "m",
        "ma",
        "maint",
        "mais",
        "malgré",
        "me",
        "même",
        "mêmes",
        "merci",
        "mettre",
        "mes",
        "mien",
        "mienne",
        "miennes",
        "miens",
        "mille",
        "mince",
        "moi",
        "moi-même",
        "moins",
        "mon",
        "moyennant",
        "n",
        "na",
        "ne",
        "néanmoins",
        "neuf",
        "neuvième",
        "ni",
        "nombreuses",
        "nombreux",
        "non",
        "nos",
        "notre",
        "nôtre",
        "nôtres",
        "nous",
        "nous-mêmes",
        "nul",
        "o",
        "o|",
        "ô",
        "oh",
        "ohé",
        "olé",
        "ollé",
        "on",
        "ont",
        "onze",
        "onzième",
        "ore",
        "ou",
        "où",
        "ouf",
        "ouias",
        "oust",
        "ouste",
        "outre",
        "p",
        "paf",
        "pan",
        "par",
        "parmi",
        "partant",
        "particulier",
        "particulière",
        "particulièrement",
        "pas",
        "passé",
        "pendant",
        "personne",
        "peu",
        "peut",
        "peuvent",
        "peux",
        "pff",
        "pfft",
        "pfut",
        "pif",
        "plein",
        "plouf",
        "plus",
        "plusieurs",
        "plutôt",
        "pouah",
        "pour",
        "pourquoi",
        "premier",
        "première",
        "premièrement",
        "près",
        "proche",
        "psitt",
        "puisque",
        "q",
        "qu",
        "quand",
        "quant",
        "quanta",
        "quant-à-soi",
        "quarante",
        "quatorze",
        "quatre",
        "quatre-vingt",
        "quatrième",
        "quatrièmement",
        "que",
        "quel",
        "quelconque",
        "quelle",
        "quelles",
        "quelque",
        "quelques",
        "quelqu'un",
        "quels",
        "qui",
        "quiconque",
        "quinze",
        "quoi",
        "quoique",
        "r",
        "revoici",
        "revoilà",
        "rien",
        "s",
        "sa",
        "sacrebleu",
        "sans",
        "sapristi",
        "sauf",
        "se",
        "seize",
        "selon",
        "sept",
        "septième",
        "sera",
        "seront",
        "ses",
        "si",
        "sien",
        "sienne",
        "siennes",
        "siens",
        "sinon",
        "six",
        "sixième",
        "soi",
        "soi-même",
        "soit",
        "soixante",
        "son",
        "sont",
        "sous",
        "stop",
        "suis",
        "suivant",
        "sur",
        "surtout",
        "t",
        "ta",
        "tac",
        "tant",
        "te",
        "té",
        "tel",
        "telle",
        "tellement",
        "telles",
        "tels",
        "tenant",
        "tes",
        "tic",
        "tien",
        "tienne",
        "tiennes",
        "tiens",
        "toc",
        "toi",
        "toi-même",
        "ton",
        "touchant",
        "toujours",
        "tous",
        "tout",
        "toute",
        "toutes",
        "treize",
        "trente",
        "très",
        "trois",
        "troisième",
        "troisièmement",
        "trop",
        "tsoin",
        "tsouin",
        "tu",
        "u",
        "un",
        "une",
        "unes",
        "uns",
        "v",
        "va",
        "vais",
        "vas",
        "vé",
        "vers",
        "via",
        "vif",
        "vifs",
        "vingt",
        "vivat",
        "vive",
        "vives",
        "vlan",
        "voici",
        "voilà",
        "vont",
        "vos",
        "votre",
        "vôtre",
        "vôtres",
        "vous",
        "vous-mêmes",
        "vu",
        "w",
        "x",
        "y",
        "z",
        "zut",
        "alors",
        "aucuns",
        "bon",
        "devrait",
        "dos",
        "droite",
        "début",
        "essai",
        "faites",
        "fois",
        "force",
        "haut",
        "ici",
        "juste",
        "maintenant",
        "mine",
        "mot",
        "nommés",
        "nouveaux",
        "parce",
        "parole",
        "personnes",
        "pièce",
        "plupart",
        "seulement",
        "soyez",
        "sujet",
        "tandis",
        "valeur",
        "voie",
        "voient",
        "état",
        "étions",
        "obtenir",
        "parfois",
        "pourraient",
        "souvent",
        "devenu",
        "tiendra",
        "tenir",
        "tiennent",
        "tient",
        "commencer",
        "directement",
        "donner",
        "figurent",
        "figurer",
        "précis",
        "préci",
        "prendre",
        "pris",
        "sûr",
        "joue",
        "jouer",
        "faire",
        "figurer",
        "figureront",
        "aller",
        "va",
        "partir",
        "autant",
        "chacune",
        "chacun",
        "essentiellement",
        "généralement",
        "parfait",
        "prennent",
        "voire",
        "voir",
        "aurez",
        "avez",
        "devrez",
        "donnont",
        "pourrait",
        "premièr",
        "prenez",
        "veillez",
        "autant",
        "chose",
        "ouvrent",
        "ouvrir",
        "pourrait",
        "pourra",
        "propos",
        "suffit",
        "également",
        "mème",
        "avez",
        "aurez"
      ]
    nltk_stops = stopwords.words("french") #stopwords de librarie nltk
    stops = useless + list(set(nltk_stops) - set(useless))
    raw =[]
    for i in range(5):
        doc = open("document_"+str(i+1)+".txt","r",encoding='utf-8-sig').read() #recuperer les textes
        raw.append(doc)
        tokens = nltk.word_tokenize(doc,language='french') #tokenize
         
        filtered_tokens = [word.lower() for word in tokens if word.lower() not in stops] #enlever stopwords
        filtered_tokens = ["".join(c for c in s if c not in string.punctuation) for s in filtered_tokens] #enlever les ponctuations
        filtered_tokens = [s for s in filtered_tokens if s and s!="’" and s!="»" and s!="«" and s.isalpha()] #enlever les ponctuations en francais et les vides
        filtered_tokens = [fr.stem(token) for token in filtered_tokens] #stemming
       
        #filtered_tokens = " ".join(filtered_tokens)
        
        doclist.append(filtered_tokens)
    return doclist

#tf(term,doc) = nombre de terme/nombre de mots total dans un document
#idf(t) = log [ nombre de documents / df(t) ]

def calculTf(dictdoc,doc):
    tfDict = {}
    N = float(len(doc)) #nombre total de mots dans le document
    for word in dictdoc:
        tfDict[word] = doc.count(word)/N #creer un dictionnaire de mots:frequence
    return tfDict

def calculIdf(dictTf):
    idfDict = dict.fromkeys(dictTf[0].keys(),0) #extraire les clés de dictTf
    for doc in dictTf:
        for word, val in doc.items():
            if val >0: #une frenquence > 0 veut dire que ce mots existe dans ce document
                idfDict[word] += 1 #incrementer le nombre de document
    for word, val in idfDict.items():
        idfDict[word] = math.log(float(len(dictTf))/float(val)) #log(5/nombre document)
    return idfDict

def tfidf(tf, idf):
    tfidf = {}
    for word,val in tf.items():
        tfidf[word] = val * idf[word] # la frequence de mot de chaque documents * idf de mot
    return tfidf #un dictionnaire de mot: poids tfidf

def main():
    doclist = matrix2D()
    dictdoc = set.union(*map(set,doclist))
    dictTf = []
    for i in range(5):
        tf = calculTf(dictdoc,doclist[i])
        dictTf.append(tf)  
    idf = calculIdf(dictTf)
    jsonDict ={}
    for i in range(5):
        weight = tfidf(dictTf[i],idf)
        jsonDict.update({i+1:weight})
    
    #enregistrer les fichiers indexés en json
    jsonfile = json.dumps(jsonDict,indent=4,ensure_ascii=False,sort_keys=True)
    idffile = json.dumps(idf,indent=4,ensure_ascii=False,sort_keys=True)
    file = codecs.open("indexation.json","w","utf-8")
    file2 = codecs.open("idf.json","w","utf-8")
    file.write(jsonfile)
    file2.write(idffile)
    file.close()
    file2.close()

main()
