class SentencesController < ApplicationController
  respond_to :html, :json

  def index

  end

  def correction
      input_text = params[:input_text]
      corrected_text = input_text.gsub('.','. ')

      respond_with do | format |
        format.html { redirect_to sentences_path  }
        format.json do
          render json: {
              input_text: input_text,
              corrected_text: corrected_text,
              metadata: 'Addition of a space after a period between sentences.'
          }.to_json
        end
      end
  end
end