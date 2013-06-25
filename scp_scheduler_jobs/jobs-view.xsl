<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="xml"/>
	<xsl:template match="/">
		<xsl:choose>
			<xsl:when test="/response/success='true'">
				<ul class="job">
					<li class="jobsHeader">
						<span class="jobName">Name</span>
						<span class="description">Description</span>
						<span class="nextFireTime">Next Fire Time</span>
						<span class="status">Status</span>
						<span class="actions"></span>
					</li>
					<xsl:apply-templates select="/response/jobs/job"/>
				</ul>
			</xsl:when>
			<xsl:otherwise><span class="error">Error Connecting</span></xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="job">
		<li>
			<span class="jobName"><xsl:value-of select="jobName"/></span>
			<span class="description"><xsl:value-of select="description"/></span>
			<span class="nextFireTime"><xsl:value-of select="nextFireTime"/></span>
			<span class="status"><xsl:value-of select="status"/></span>
			<span class="actions">
				<a class="title button">Options</a>
				<span class="box" style="display:none">
					<a href="#" title="Results" action="jobResults" jobName="{jobName}">Results</a>
					<xsl:if test="outputDirectory='true'">
						<a href="{schedulerOutputFiles}/{jobName}/" target="_blank" title="Output Files">Output</a>
					</xsl:if>
				</span>
			</span>
			<div class="resultDiv {jobName}" style="display:none"><span class="loading"></span></div>
		</li>
	</xsl:template>
</xsl:stylesheet>
