json.extract! plan, :id, :name, :created_at, :updated_at
json.url plan_url(plan, format: :json)

json.student current_user.login
json.planName :name
json.major "Computer Science"
json.catalogYear 
json.courses  do |terms|
    json.

    
    