<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" omit-xml-declaration="yes"/>
	<xsl:strip-space elements="*"/>
	<xsl:template match="/account">
		<table class="properties">
			<xsl:apply-templates select="balance"/>
			<!--xsl:apply-templates select="value"/-->
		</table>
		<h3>Transactions:</h3>
		<table class="transactions">
			<thead>
				<tr>
					<th class="postingsDateHeader">Effective Date</th>
					<th class="postingsDescriptionHeader">Description</th>
					<th class="postingsAmountHeader">Amount</th>
				</tr>
			</thead>
			<tbody>
				<xsl:apply-templates select="postings/posting">
					<xsl:sort select="seq" order="descending" data-type="number"/>
				</xsl:apply-templates>
			</tbody>
		</table>
	</xsl:template>
	<xsl:template match="posting">
		<tr>
			<td class="postingsDateCell">
				<xsl:value-of select="EffectiveTime"/>
			</td>
			<td class="postingsDescriptionCell">
				<xsl:value-of select="description"/>
			</td>
			<td class="postingsAmountCell">
				<xsl:value-of select="amount"/>
			</td>
		</tr>
	</xsl:template>
	<xsl:template match="balance">
		<tr class="accountBalance">
			<th>Balance</th>
			<td><xsl:value-of select="text()"/></td>
		</tr>
		<tr class="accountEffectiveTime">
			<th>As at</th>
			<td><xsl:value-of select="/account/timepoint/effectiveTime"/></td>
		</tr>
	</xsl:template>
	<xsl:template match="value">
		<tr>
			<td>value</td>
			<td>
				<xsl:value-of select="text()"/>
			</td>
		</tr>
	</xsl:template>
</xsl:stylesheet>
