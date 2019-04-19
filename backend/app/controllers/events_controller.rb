class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  def index
    @events = Event.all
    render json: @events
  end

  def show
  end

  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event, status: :accepted
    else
      render json: { errors: @event.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def edit
  end

  def update
    @event.update(event_params)
    if @event.save
      render json: @event, status: :accepted
    else
      render json: { errors: @event.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    if @event.destroy
      render json: @events
    else
      render json: { errors: @event.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def event_params
    params.require(:events).permit!
  end

  def set_event
    @event = Event.find(params[:id])
    render json: @event
  end

end
