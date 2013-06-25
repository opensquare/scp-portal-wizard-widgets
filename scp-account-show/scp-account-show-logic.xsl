<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml"/>
	<xsl:template match="/">
		<account>
			<timepoint>
				<effectiveTime>
					<xsl:value-of select="pactresponse/event/TimePoint/EffectiveTime"/>
				</effectiveTime>
				<physicalTime>
					<xsl:value-of select="pactresponse/event/TimePoint/PhysicalTime"/>
				</physicalTime>
			</timepoint>
			<uid><xsl:value-of select="pactresponse/entity/PartyAccount/identifier/uid"/><xsl:value-of select="pactresponse/entity/RequestAccumulator/identifier/uid"/></uid>
			<balance><xsl:value-of select="pactresponse/entity/PartyAccount/balance"/><xsl:value-of select="pactresponse/entity/RequestAccumulator/balance"/></balance>
			<value><xsl:value-of select="pactresponse/entity/PartyAccount/value"/><xsl:value-of select="pactresponse/entity/RequestAccumulator/value"/></value>
			<description><xsl:value-of select="pactresponse/entity/PartyAccount/description"/><xsl:value-of select="pactresponse/entity/RequestAccumulator/description"/></description>
			<postings>
        <xsl:apply-templates select="pactresponse/entity/Posting"/>
			</postings>
		</account>
	</xsl:template>
	<xsl:template match="Posting">
    <posting>
      <uid>
				<xsl:value-of select="identifier/uid"/>
			</uid>
			<PhysicalTime>
				<xsl:value-of select="TimePoint/PhysicalTime"/>
			</PhysicalTime>
			<EffectiveTime>
				<xsl:value-of select="TimePoint/EffectiveTime"/>
			</EffectiveTime>
			<amount>
				<xsl:value-of select="amount"/>
			</amount>
			<description>
				<xsl:value-of select="description"/>
			</description>
			<seq>
				<xsl:value-of select="@seq"/>
			</seq>
    </posting>
	</xsl:template>
</xsl:stylesheet>
