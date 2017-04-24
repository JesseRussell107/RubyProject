json.extract! plan, :id, :name, :created_at, :updated_at
json.url plan_url(plan, format: :json)

json.student current_user.login
json.planName :name
json.major current_user.major
json.catalogYear plan.startyear
json.courses do |terms|
    json.

    
    