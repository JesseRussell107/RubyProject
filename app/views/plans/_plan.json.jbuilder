json.extract! plan, :id, :name, :created_at, :updated_at
json.url plan_url(@plan, format: :json)

json.student current_user.login
json.planName @plan.name
json.major current_user.major
json.catalogYear @plan.startyear
if (Date.today.month < 5)
    json.currTerm "Spring"
elsif (Date.today.month < 8)
    json.currTerm "Summer"
else
    json.currTerm "Fall"
end
json.currYear DateTime.now.year
json.terms @plan.terms do |term|
    json.semester term.semester
    json.year term.year
    json.courses term.courses do |course| 
        json.name course.name
        json.courseID course.course_id
        json.credits course.credits
    end
end

json.courses @courses do |course|
    json.name course.name
    json.courseID course.course_id
    json.credits course.credits
    json.description course.description
    json.type course.course_type
end
