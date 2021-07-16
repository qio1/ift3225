<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- one rule, to transform the input root (/) -->
    <xsl:template match="/">
        <html>
            <head>
                <title>Messages Institutionnels</title>
                <link href="../../wwwroot/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet"></link>
                <link href="../../wwwroot/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"></link>
                <link href="../../wwwroot/css/main.css" rel="stylesheet"></link>
                        
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"></link>
                <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'></link>
                <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'></link>
                <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'></link>                                        
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">XSLT</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="navbarColor02">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Un <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">élément</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">boostrap</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">avec XML et XSLT</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="container">                   
                    <h4>- Apply Template - Tout les messages et institutions.</h4>
                    <h6>
                        Les données des messages proviennes des balises xml sans changements. Par contre, le comportement
                        des données "institution" sont changées par un template.
                    </h6>
                    <xsl:apply-templates />
                    
                    <h4>- Call Template</h4>
                    <h6>
                        Appeler un template par son nom. Il peut contenir du HTMl et XSLT comme le template présent.
                    </h6>
                    <xsl:call-template name="callTemplate"/>   
                    <xsl:call-template name="callTemplate"/>
                    
                    
                    <h4>- For each</h4>
                    <h6>
                        Boucle sur les éléments d'une balise spécifié. (//nom_balise).
                        Il est possible de mettre du HTML et d'autres éléments XSLT.
                    </h6>
                    <ul>
                        <xsl:for-each select="//message">
                            <li>
                                <xsl:value-of select="header"/>
                            </li>
                        </xsl:for-each>
                    </ul>
                    
                    <h4>- If</h4>
                    <h6>
                        Avec un for each, permet de faire une opération si la condition est respectée.
                    </h6>
                    <ul>
                        <xsl:for-each select="//message">
                            <xsl:if test="header='Bonjour'">
                                <li>
                                    <xsl:value-of select="text"/>
                                </li>
                            </xsl:if>
                        </xsl:for-each>
                    </ul>
                    
                    <h4>- Choose inside For each</h4>
                    <h6>
                        Peut être vu comme le fameux if-else des languages de programmation traditionnels.
                    </h6>
                    <xsl:for-each select="//message">
                        <xsl:choose>
                            <xsl:when test="header='Bonjour' or header='Bon matin'">
                                <p>Dire "<xsl:value-of select="header"/>" lorsqu'on quitte n'est pas normal...</p>
                            </xsl:when>
                            <xsl:otherwise>
                                    <xsl:value-of select="header"/>                                
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:for-each>
                    
                    <h4>- Sort with For each</h4>
                    <h6>
                        Il est possible de trier la liste d'éléments que l'on obtient.
                        Par défaut, celle-ci est par ordre alphabétique. Voici quelques paramètres supplémentaires :
                    </h6>
                    <h6>
                        data-type="number" - order="descending" - select="substring(@elementXYZ,0,5)" - etc.
                    </h6>
                    <ul>
                        <xsl:for-each select="//message">
                            <xsl:sort select="header"/>
                            <li>
                                <xsl:value-of select="header"/> <br />
                                <xsl:value-of select="text"/>
                            </li>
                        </xsl:for-each>
                    </ul>
                    
                    <h4>- Attributes</h4>
                    <h6>
                       Nous pouvons mettre des éléments dans des balises en les traitant comme des paramètres. 
                    </h6>
                    <xsl:call-template name="institutionLink"/>

                    <h4>- Variable</h4>
		    <h6>Sans valeur d'un fichier XML, erreur NaN</h6>
                    <xsl:variable name="nb" />
		    <xsl:value-of select="$nb + 1" />

                </div>
                <script src="../../wwwroot/lib/jquery/jquery.min.js"></script>
                <script src="../../wwwroot/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
                <script src="../../wwwroot/lib/jquery-easing/jquery.easing.min.js"></script>
                <script src="../../wwwroot/js/main.js"></script>
            </body>
        </html>
    </xsl:template>
    <xsl:template name="callTemplate">
        <p>Je viens d'un template.</p>
    </xsl:template>
    <xsl:template name="institutionLink">
       <xsl:for-each select="//institution">
           <a>
               <xsl:attribute name="href">
                   <xsl:value-of select="url"/>
               </xsl:attribute>
               <xsl:value-of select="name"/>
           </a>
       </xsl:for-each>
    </xsl:template>
    <xsl:template match="institution">
        <br />
        Title: <span style="color:#ff0000">
            <xsl:value-of select="."/></span>
        <br />
    </xsl:template>
</xsl:stylesheet>
