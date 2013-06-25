<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="xml"/>
	<xsl:template match="/">
		<ul class="search-results">
			<xsl:choose>
				<xsl:when test="/pactresponse/entity/IdentifiedEntity">
					<xsl:apply-templates select="/pactresponse/entity/IdentifiedEntity"/>
				</xsl:when>
				<xsl:otherwise><li>No records found</li></xsl:otherwise>
			</xsl:choose>
		</ul>
	</xsl:template>
	<xsl:template match="IdentifiedEntity">
		<xsl:variable name="descriptionParts" select="tokenize(description, '\|')"/>
		<li>
			<xsl:attribute name="class"><xsl:value-of select="concat($descriptionParts[2], ' ', $descriptionParts[3])"/></xsl:attribute>
			<span>
				<xsl:value-of select="$descriptionParts[1]"/>
			</span>
			<a class="button">
				<xsl:attribute name="href">#policy/show/<xsl:value-of select="identifier/uid"/></xsl:attribute>
				show
			</a>
		</li>
	</xsl:template>
</xsl:stylesheet>
