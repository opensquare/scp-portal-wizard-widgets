<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="xml"/>
    <xsl:template match="/">
        <agreement>
			<uid><xsl:value-of select="/pactresponse/entity/Agreement/uid"/></uid>
			<description><xsl:value-of select="/pactresponse/entity/Agreement/description"/></description>
			<entityType><xsl:value-of select="/pactresponse/entity/Agreement/entityType"/></entityType>
           <actions>
			   <xsl:apply-templates select="/pactresponse/entity/Agreement/PartyRole/Action"/>
           </actions>
        </agreement>
    </xsl:template>
    <xsl:template match="Action">
        <action>
            <uid>
                <xsl:value-of select="TimeSpanEntity/identifier/uid"/>
            </uid>
            <description>
                <xsl:value-of select="TimeSpanEntity/description"/>
            </description>
            <properties>
				<xsl:apply-templates select="TimeSpanEntity/TimeSpanEntityVersion/Properties/*"/>
            </properties>
        </action>
    </xsl:template>
    <xsl:template match="Properties/*">
		<xsl:element name="{@name}"><xsl:value-of select="."/></xsl:element>
    </xsl:template>
</xsl:stylesheet>
