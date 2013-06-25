<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="xml"/>
    <xsl:template match="/">
        <Entities>
            <xsl:choose>
                <xsl:when test="/pactresponse/entity/IdentifiedEntity">
                    <xsl:apply-templates select="/pactresponse/entity/IdentifiedEntity"/>
                </xsl:when>
                <xsl:otherwise>No records found</xsl:otherwise>
            </xsl:choose>
        </Entities>
    </xsl:template>
    <xsl:template match="IdentifiedEntity">
        <xsl:variable name="descriptionParts" select="tokenize(description, '\|')"/>
        <xsl:variable name="entityType">
            <xsl:value-of select="$descriptionParts[2]"/>
        </xsl:variable>
        <IdentifiedEntity>
            <entityType><xsl:value-of select="$entityType"/></entityType>
            <state><xsl:value-of select="$descriptionParts[3]"/></state>
            <name><xsl:value-of select="$descriptionParts[1]"/></name>
            <xsl:variable name="widget">
                <xsl:choose>
                    <xsl:when test="$entityType='policy'">show</xsl:when>
                    <xsl:when test="$entityType='clientRelationship'">client</xsl:when>
                    <xsl:otherwise>entity</xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
            <widget><xsl:value-of select="$widget"/></widget>
            <uid><xsl:value-of select="identifier/uid"/></uid>
        </IdentifiedEntity>
    </xsl:template>
</xsl:stylesheet>
