<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="xml"/>
    <xsl:template match="/agreement">
        <div class="userActions">
            <xsl:apply-templates select="actions/action[not(starts-with(description, '_'))][not(contains(description, 'asAgreementForParty'))][not(contains(description, 'Create New Version'))]">
                <xsl:sort select="description"/>
            </xsl:apply-templates>
        </div>
    </xsl:template>
    <xsl:template match="action">
        <xsl:param name="context"/>
        <xsl:choose>
            <xsl:when test="$context='paramString'">&amp;toUid=<xsl:value-of select="/agreement/uid"/>
                <xsl:for-each select="properties/*[contains(name(), 'Uid')]">
                    <xsl:value-of select="concat('&amp;', name(), '=', text())"/>
                </xsl:for-each>
                <xsl:if test="properties/entityName">&amp;entityName=<xsl:value-of select="properties/entityName"/>
                </xsl:if>
                <xsl:if test="properties/entity2Name">&amp;entity2Name=<xsl:value-of select="properties/entityName"/>
                </xsl:if>
                <xsl:if test="properties/selection">&amp;selection=<xsl:value-of select="substring-before(substring-after(properties/selection, '&lt;![CDATA['), ']]&gt;')"/>
                </xsl:if>
                <xsl:if test="properties/selection2">&amp;selection2=<xsl:value-of select="substring-before(substring-after(properties/selection2, '&lt;![CDATA['), ']]&gt;')"/>
                </xsl:if>
                <xsl:if test="properties/params">&amp;<xsl:value-of select="properties/params"/>
                </xsl:if>&amp;actionUid=<xsl:value-of select="uid"/>&amp;actorUid={{0}}&amp;starterForm=true&amp;clearEntities=true
            </xsl:when>
            <xsl:otherwise>
                <a class="userAction pw-button popup">
                    <xsl:variable name="formsLayout">
                        <xsl:choose>
                            <xsl:when test="properties/formsLayout"><xsl:value-of select="properties/formsLayout"/></xsl:when>
                            <xsl:otherwise>confirm</xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>
                    <xsl:attribute name="href">#form/<xsl:value-of select="$formsLayout"/>?userType=staff<xsl:apply-templates select=".">
                            <xsl:with-param name="context">paramString</xsl:with-param>
                        </xsl:apply-templates>
                    </xsl:attribute>
                    <xsl:value-of select="description"/>
                </a>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>
