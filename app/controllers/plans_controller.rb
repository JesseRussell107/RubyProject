class PlansController < ApplicationController
  before_action :authenticate_user!
  before_action :set_plan, only: [:show, :edit, :update, :destroy]

  layout :resolve_layout

  # GET /plans
  # GET /plans.json
  def index
    @plans = Plan.all
    if not (current_user.role? :faculty) || (current_user.role? :admin)
      @plans = Plan.where(user_id: current_user.id)
    end
  end

  # GET /plans/1
  # GET /plans/1.json
  def show
    @courses = Course.select(:name, :course_id, :credits, :description, :course_type).distinct
  end

  # GET /plans/new
  def new
    @plan = Plan.new(new_plan_params)
  end

  # GET /plans/1/edit
  def edit
  end

  # POST /plans/1/addCourse
  def addCourse
    @t = Term.where(semester: add_params[:semester], year: add_params[:year], plan_id: add_params[:id]).take
    @c = Course.where(course_id: add_params[:courseid]).take
    @tc = TermCourse.create(:term_id =>  @t.id, :course_id => @c.id)
    if request.xhr?
      render :json => {}
    end
  end

  # POST /plans/1/deleteCourse
  def deleteCourse
    @t = Term.where(semester: delete_params[:semester], year: delete_params[:year], plan_id: delete_params[:id]).take
    @c = Course.where(course_id: delete_params[:courseid]).take
    @tc = TermCourse.where(term_id: @t.id, course_id: @c.id).take
    @tc.destroy
    if request.xhr?
      render :json => {}
    end
  end

  # POST /plans/1/addTerm
  def addTerm
    Term.create(semester: "Spring", year: term_params[:year], plan_id: term_params[:id])
    Term.create(semester: "Summer", year: term_params[:year], plan_id: term_params[:id])
    Term.create(semester: "Fall", year: term_params[:year].to_i-1, plan_id: term_params[:id])
  end

  # POST /plans/1/deleteTerm
  def deleteTerm
    Term.where(semester: "Spring", year: term_params[:year], plan_id: term_params[:id]).take.destroy
    Term.where(semester: "Summer", year: term_params[:year], plan_id: term_params[:id]).take.destroy
    Term.where(semester: "Fall", year: term_params[:year].to_i-1, plan_id: term_params[:id]).take.destroy
  end  

  # POST /plans
  # POST /plans.json
  def create
    @plan = Plan.new(plan_params)
    @plan.user_id = current_user.id

    respond_to do |format|
      if @plan.save
        format.html { redirect_to @plan, notice: 'Plan was successfully created.' }
        format.json { render :show, status: :created, location: @plan }
        Term.create(plan_id: @plan.id, semester: "Fall", year: @plan.startyear)
        Term.create(plan_id: @plan.id, semester: "Spring", year: @plan.startyear+1)
        Term.create(plan_id: @plan.id, semester: "Summer", year: @plan.startyear+1)
      else
        format.html { render :new }
        format.json { render json: @plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /plans/1
  # PATCH/PUT /plans/1.json
  def update
    respond_to do |format|
      if @plan.update(plan_params)
        format.html { redirect_to @plan, notice: 'Plan was successfully updated.' }
        format.json { render :show, status: :ok, location: @plan }
      else
        format.html { render :edit }
        format.json { render json: @plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /plans/1
  # DELETE /plans/1.json
  def destroy
    @plan.destroy
    respond_to do |format|
      format.html { redirect_to plans_url, notice: 'Plan was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_plan
      case params[:id]
      when "course"
      else 
      @plan = Plan.find(params[:id])
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def new_plan_params
      params.permit(:name, :startyear)
    end
    
    def plan_params
      params.require(:plan).permit(:startyear, :name)
    end

    def term_params
      params.require(:course).permit(:year)
    end

    def delete_params
      params.permit(:semester, :year, :courseid, :id)
    end
    
    def add_params
      params.permit(:semester, :year, :courseid, :id)
    end

    def term_params
      params.permit(:year, :id)
    end
    

    def resolve_layout
      case action_name
      when "show"
        "show"
      else
        "application"
      end
    end
end
