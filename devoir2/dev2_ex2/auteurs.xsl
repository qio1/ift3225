<?xml version="1.0" encoding="UTF-8"?>
<!-- Qiao Wang 20095140-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method="xhtml"
        doctype-system="http://www.w3.org/Strict/xhtml1/DTD/xhtml1-
        strict.dtd" 
        doctype-public="-//W3C//DTD XHTML 1.1 Strict//EN" />
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>Auteurs</title>
                <link rel="stylesheet" type="text/css" href="bibliotheque.css" />
            </head>
            <body>
                <h2>Les auteurs de la bibliothèque</h2>
                <table>
                    <thead>
                        <tr>
                            <th scope="col" id="image">Photo</th>
                            <th scope="col">Auteur</th>
                            <th scope="col">Pays</th>
                            <th scope="col">Livres</th>
                            <th scope="col">Commentaire</th>
                        </tr>
                    </thead>
                    <xsl:for-each select="//auteur">
                        <xsl:sort select="nom" order="ascending"/>
                            <tr>
                                <td>
                                    <img>
                                    <xsl:attribute name="src"><xsl:value-of select="photo"/></xsl:attribute>
                                    </img>
                                </td>
                                <td> <p><xsl:value-of select="concat(prenom, ' ', nom)"/></p>
                                </td>
                                <td>
                                    <p><xsl:value-of select="pays"/></p>
                                </td>
                                <td>
                                    <ul>
                                        
                                    <xsl:variable name="auteur" select="@ident"/> 
                                        <xsl:for-each select="//livre">
                                            <!--en ordre croissant de leur prix-->
                                            <xsl:sort select="prix" order="ascending" data-type="number"/>
                                        <xsl:if test="contains(./@auteurs,$auteur)">
                                            <li><b><xsl:value-of select="titre"/></b>&#160;(<xsl:value-of select="annee"/>)<br/>
                                                <xsl:value-of select="concat('prix: ',prix, ' ',prix/@devise)"/><br/>
                                            </li>
                                        </xsl:if>
                                    </xsl:for-each>
                                    </ul>
                                </td>
                                <td>
                                    <p><xsl:value-of select="commentaire"/></p>
                                </td>
                            </tr>   
                    </xsl:for-each>
                </table>
                            
            </body>
        </html>
            
    </xsl:template>
    
</xsl:stylesheet>