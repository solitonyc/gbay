class ClubsController < ApplicationController
  before_action :set_club, only: [:show, :update, :destroy]
  # before_action :authorize_request, except: %i[index show]
  
  # GET /clubs
  def index
    if params[:user_id]
      @user = User.find(params[:user_id])
      render json: @user.clubs
    else

      @clubs = Club.all
      render json: @clubs
    end
  end

  # GET /clubs/1
  def show
    render json: @club
  end

  # POST /clubs
  def create
    @club = Club.new(club_params)

    if @club.save
      render json: @club, status: :created, location: @club
    else
      render json: @club.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /clubs/1
  def update
    if params[:user_id]
      @user = User.find(params[:user_id])
      @user.clubs << @club
      render json: @club

    elsif @club.update(club_params)
      render json: @club
    
    else
      render json: @club.errors, status: :unprocessable_entity
    end
  end

  # DELETE /clubs/1
  def destroy
    @club.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_club
      @club = Club.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def club_params
      params.require(:club).permit(:headline, :image, :brand, :model, :dexterity, :shaft_name, :shaft_flex, :shaft_weight, :club_color, :loft, :club_length, :description, :condition, :price, :user_id)
    end
end
