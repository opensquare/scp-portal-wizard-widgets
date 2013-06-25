<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="xml"/>
	<xsl:template match="/">
		<div>
			<span class="close"><a href="#">close</a></span>
			<xsl:choose>
				<xsl:when test="/response/success='true'">
					<table>
						<thead>
							<tr>
								<th>Start Time</th>
								<th>End Time</th>
								<th>Success</th>
								<th>Message</th>
								<th colspan="2">Actions</th>
							</tr>
						</thead>
						<tbody>
							<xsl:apply-templates select="/response/results/result"/>
						</tbody>
						<tfoot>
							<tr>
								<xsl:variable name="limit">
									<xsl:value-of select="/response/results/limit"/>
								</xsl:variable>
								<xsl:variable name="offset">
									<xsl:value-of select="/response/results/offset"/>
								</xsl:variable>
								<xsl:variable name="range"><xsl:value-of select="$offset+1"/> - <xsl:value-of select="$offset + $limit"/></xsl:variable>
								<td colspan="6">
									<a href="#" class="first" title="First Page" action="changePage">
										<xsl:attribute name="page">0</xsl:attribute>&lt;&lt;
									</a>
									<a href="#" class="previous" title="Previous Page" action="changePage">
										<xsl:attribute name="page"><xsl:value-of select="$offset - $limit"/></xsl:attribute>&lt;
									</a>
									<span class="pageRange"><xsl:value-of select="concat($range, ' ')"/></span>
									<a href="#" class="next" title="Next Page" action="changePage">
										<xsl:attribute name="page"><xsl:value-of select="$offset + $limit"/></xsl:attribute>&gt;
									</a>
								</td>
							</tr>
						</tfoot>
					</table>
				</xsl:when>
				<xsl:otherwise>
					<p>
						<b>Error connecting to scheduler</b>
					</p>
				</xsl:otherwise>
			</xsl:choose>
		</div>
	</xsl:template>
	<xsl:template match="result">
		<tr>
			<td>
				<xsl:value-of select="EXECUTION_START_TIME"/>
			</td>
			<td>
				<xsl:value-of select="EXECUTION_END_TIME"/>
			</td>
			<td>
				<xsl:value-of select="SUCCESS"/>
			</td>
			<td class="urlDecode">
				<xsl:value-of select="MESSAGE"/>
			</td>
			<td>
				<xsl:if test="EXECUTION_START_TIME != 'null'" >
					<a href="#" action="viewLog" type="report">
						<xsl:attribute name="target">_blank</xsl:attribute>
						<xsl:attribute name="jobName"><xsl:value-of select="JOB_NAME"/></xsl:attribute>
						<xsl:attribute name="fireTime"><xsl:value-of select="substring(translate(EXECUTION_START_TIME, ' .:', '---'), 0, 20)"/></xsl:attribute>
						<xsl:attribute name="fireTimeNice"><xsl:value-of select="EXECUTION_START_TIME"/></xsl:attribute>
						View Report
					</a>
				</xsl:if>
			</td>
			<td>
				<xsl:if test="EXECUTION_START_TIME != 'null'" >
					<a href="#" action="viewLog" type="output">
						<xsl:attribute name="target">_blank</xsl:attribute>
						<xsl:attribute name="jobName"><xsl:value-of select="JOB_NAME"/></xsl:attribute>
						<xsl:attribute name="fireTime"><xsl:value-of select="substring(translate(EXECUTION_START_TIME, ' .:', '---'), 0, 20)"/></xsl:attribute>
						<xsl:attribute name="fireTimeNice"><xsl:value-of select="EXECUTION_START_TIME"/></xsl:attribute>
						View Output
					</a>
				</xsl:if>
			</td>
		</tr>
	</xsl:template>
</xsl:stylesheet>