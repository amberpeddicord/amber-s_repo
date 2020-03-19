<schema xmlns:sch="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2"
    xmlns:sqf="http://www.schematron-quickfix.com/validator/process"
    xmlns="http://purl.oclc.org/dsdl/schematron">
    
    <pattern><title>Australian Locations</title>
        <rule context="location[text()[contains(., 'AU')]]">
            <assert test="@lon gt 100">Australian locations must have longitude readings that are positive and greater than zero!</assert>
            <assert test="@lat lt 0">Australian locations must have latitude readings that are negative and less than zero!</assert>
        </rule>
    </pattern>
    
    <pattern>
        <rule context="location[text()[contains(., 'USA')]]">
            <assert test="@lon lt 0">Locations in the United States must have a longitude of less than 0!</assert>
            <assert test="@lat gt 0">Locations in the United States must have a latitude of greater than 0!</assert>
        </rule>
    </pattern>
</schema>