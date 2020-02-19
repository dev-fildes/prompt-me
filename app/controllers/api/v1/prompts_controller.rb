class Api::V1::PromptsController < ApplicationController

  def index
    results = PromptsWrapper.retrieve_prompts
    render json: results
  end

end
