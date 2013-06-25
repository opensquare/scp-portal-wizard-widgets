<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml"/>
	<xsl:template match="/">
		<accounts>
			<xsl:apply-templates select="/pactresponse/entity/identifier">
				<xsl:sort select="relationship" />
			</xsl:apply-templates>
		</accounts>
	</xsl:template>
	<xsl:template match="identifier">
		<account>
			<uid>
				<xsl:value-of select="uid"/>
			</uid>
			<relationship>
				<xsl:value-of select="relationship"/>
			</relationship>
		</account>
	</xsl:template>
</xsl:stylesheet>
