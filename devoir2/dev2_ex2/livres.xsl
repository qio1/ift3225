<?xml version="1.0" encoding="UTF-8"?>
<!-- Qiao Wang 20095140-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method="html"
        doctype-system="http://www.w3.org/Strict/xhtml1/DTD/xhtml1-
        strict.dtd" 
        doctype-public="-//W3C//DTD XHTML 1.1 Strict//EN" />
    
    <!--Parametres pour definie un échelle de prix-->
    <xsl:param name="dePrix" as="xs:integer">15</xsl:param>
    <xsl:param name="auPrix" as="xs:integer">100</xsl:param>
    
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>Livres</title>
                <link rel="stylesheet" type="text/css" href="bibliotheque.css" />
            </head>
            <body>
                <h2>Les livres de la bibliothèque</h2>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Couverture</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Langue</th>
                            <th scope="col">Auteur(s)</th>
                            <th scope="col">Prix</th>
                            <th scope="col">Commentaire</th>
                        </tr>
                    </thead>
                    <xsl:for-each select="//livre">
                        <!-- ordre décroissant de leur nom d'auteur-->
                        <xsl:sort select="@auteurs" order="descending"/>
                        <tr>
                            <xsl:choose>
                                <xsl:when test="prix&gt;= $dePrix and prix&lt;= $auPrix">
                           <td>
                                <img>
                                    <xsl:attribute name="src"><xsl:value-of select="couverture"/></xsl:attribute>
                                </img>
                            </td>
                            <td> <p><xsl:value-of select="titre"/></p>
                            </td>
                            <td>
                                <p><xsl:value-of select="@langue"/></p>
                            </td>
                            <td>
                                    <xsl:variable name="auteur" select="@auteurs"/> 
                                    <xsl:for-each select="//auteur">
                                        <xsl:if test="contains($auteur,@ident)">
                                           <p> <xsl:value-of select="concat(prenom, ' ', nom)"/></p>
                                            
                                        </xsl:if>
                                    </xsl:for-each>
                            </td>
                            <td>
                                <p><xsl:value-of select="concat(prix, ' ', prix/@devise)"/></p>
                            </td>
                            <td>
                                <p><xsl:value-of select="commentaire"/></p>
                            </td>
                                </xsl:when>
                                <xsl:otherwise>
                                </xsl:otherwise>
                            </xsl:choose>
                        </tr>   
                    </xsl:for-each>
                </table>
                
            </body>
        </html>
        
    </xsl:template>
    
</xsl:stylesheet>