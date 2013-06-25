<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="xml"/>
    <xsl:template match="/">
        <h1 class="associatedAgreements">Associated Agreements</h1>
        <ul>
            <xsl:choose>
                <xsl:when test="/pactresponse/entity/IdentifiedEntity">
                    <xsl:apply-templates select="/pactresponse/entity/IdentifiedEntity"/>
                </xsl:when>
                <xsl:otherwise>
                    <li>No records found</li>
                </xsl:otherwise>
            </xsl:choose>
        </ul>
    </xsl:template>
    <xsl:template match="IdentifiedEntity">
        <xsl:variable name="descriptionParts" select="tokenize(description, '\|')"/>
        <xsl:variable name="entityType">
            <xsl:value-of select="$descriptionParts[2]"/>
        </xsl:variable>
        <li>
            <xsl:attribute name="class">
                <xsl:value-of select="concat($entityType, ' ', $descriptionParts[3])"/>
            </xsl:attribute>
            <span>
                <xsl:value-of select="$descriptionParts[1]"/>
            </span>
            <xsl:variable name="widget">
                <xsl:choose>
                    <xsl:when test="$entityType='policy'">#policy/show</xsl:when>
                    <xsl:when test="$entityType='clientRelationship'">#policy/client</xsl:when>
                    <xsl:when test="$entityType='claim'">#claims/show</xsl:when>
                    <xsl:otherwise>#policy/entity</xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
            <a class="button">
                <xsl:attribute name="href"><xsl:value-of select="$widget"/>/<xsl:value-of select="identifier/uid"/>
                </xsl:attribute>
				show
            </a>
        </li>
    </xsl:template>
</xsl:stylesheet>
