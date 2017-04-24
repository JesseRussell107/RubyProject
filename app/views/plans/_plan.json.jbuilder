json.extract! plan, :id, :name, :created_at, :updated_at
json.url plan_url(plan, format: :json)

json.student current_user.login
json.planName :name
json.major current_user.major
json.catalogYear @plan.startyear
json.terms @plan.terms do |term|
    json.semester term.semester
    json.year term.year
    json.course course.course_id do |course| 
    next if (term_course.term_id == term.id && term_course.course_id == course.course_id)
        json.name course.name
        json.courseID course.course_id
        json.credits course.credits
    end
end



    
    