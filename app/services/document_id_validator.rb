class DocumentIdValidator
  def self.validate(schema)
    return [nil, nil] unless schema.is_a?(Hash)

    groups = schema["groups"] || []
    groups.each do |group|
      group = schema.dig("content", group)
      pages = group&.dig("pages") || []
      pages.each do |page|
        next unless page["document_id"].present? && page["document_id"] != ""
        document_id = page["document_id"]
        doc_name = "#{document_id}.pdf"
        the_doc = Document.find_by(name: doc_name)
        if the_doc.nil?
          return [:missing_document_id, "Could not find document #{doc_name}"]
        end
      end
    end
    [nil, nil]
  end
end
