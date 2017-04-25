# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#make some roles
student = Role.create(name: "student")
faculty = Role.create(name: "faculty")
admin = Role.create(name: "admin")

#make some users
user1 = User.new
user1.login = "joe"
user1.email = "joe@cedarville.edu"
user1.password = "password"
user1.password_confirmation = "password"
user1.roles << student
user1.major = "Computer Science"
user1.save!

user2 = User.new
user2.login = "pete"
user2.email = "pete@cedarville.edu"
user2.password = "password"
user2.password_confirmation = "password"
user2.roles << student
user2.major = "Psychology"
user2.save!

#give joe a couple of plans
plan1 = Plan.create(user_id: user1.id, name: "Plan1", startyear: 2015)
plan2 = Plan.create(user_id: user1.id, name: "Plan2", startyear: 2016)

#give joe some terms
term1 = Term.create(plan_id: plan1.id, semester: "Fall", year: 2015)
term2 = Term.create(plan_id: plan1.id, semester: "Spring", year: 2016)
term3 = Term.create(plan_id: plan1.id, semester: "Summer", year: 2016)

#give joe some courses
course1 = Course.create(name: "C++ Programming", course_id: "CS-1210", credits: 3)
course2 = Course.create(name: "Object Oriented Design", course_id: "CS-1220", credits: 3)
course3 = Course.create(name: "Java Programming", course_id: "CS-2210", credits: 3)

#stick 'em together
TermCourse.create(term_id: term1.id, course_id: course1.id)
TermCourse.create(term_id: term1.id, course_id: course2.id)
TermCourse.create(term_id: term2.id, course_id: course3.id)

user3 = User.new
user3.login = "admin"
user3.email = "admin@cedarville.edu"
user3.password = "password"
user3.password_confirmation = "password"
user3.roles << admin
user3.save!

user4 = User.new
user4.login = "tech"
user4.email = "tech@cedarville.edu"
user4.password = "password"
user4.password_confirmation = "password"
user4.roles << student
user4.roles << admin
user4.save!

user5 = User.new
user5.login = "gallaghd"
user5.email = "gallaghd@cedarville.edu"
user5.password = "password"
user5.password_confirmation = "password"
user5.roles << faculty
user5.roles << admin
user5.save!

user6 = User.new
user6.login = "dude"
user6.email = "dude@cedarville.edu"
user6.password = "password"
user6.password_confirmation = "password"
user6.roles << faculty
user6.save!

#make some plans
Plan.create(user_id: user2.id, name: "Test")
Plan.create(user_id: user2.id, name: "NoTest")
Plan.create(user_id: user3.id, name: "ShowOff")
Plan.create(user_id: user4.id, name: "iss43_v2")
Plan.create(user_id: user5.id, name: "CUFriday")
Plan.create(user_id: user6.id, name: "dummy")
