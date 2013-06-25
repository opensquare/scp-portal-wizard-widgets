<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:template match="/">
		<select>
			<option>Select an account...</option>
			<xsl:apply-templates select="/accounts/account" />
		</select>
	</xsl:template>
	<xsl:template match="account">
		<option>
			<xsl:attribute name="value" select="uid"/>
			<xsl:value-of select="relationship"/>
		</option>
	</xsl:template>
</xsl:stylesheet>
