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
term4 = Term.create(plan_id: plan1.id, semester: "Fall", year: 2016)
term5 = Term.create(plan_id: plan1.id, semester: "Spring", year: 2017)
term6 = Term.create(plan_id: plan1.id, semester: "Summer", year: 2017)
term7 = Term.create(plan_id: plan1.id, semester: "Fall", year: 2017)
term8 = Term.create(plan_id: plan1.id, semester: "Spring", year: 2018)
term9 = Term.create(plan_id: plan1.id, semester: "Summer", year: 2018)
term10 = Term.create(plan_id: plan1.id, semester: "Fall", year: 2018)
term11 = Term.create(plan_id: plan1.id, semester: "Spring", year: 2019)
term12 = Term.create(plan_id: plan1.id, semester: "Summer", year: 2019)

term13 = Term.create(plan_id: plan2.id, semester: "Fall", year: 2016)
term23 = Term.create(plan_id: plan2.id, semester: "Spring", year: 2017)
term33 = Term.create(plan_id: plan2.id, semester: "Summer", year: 2017)
term43 = Term.create(plan_id: plan2.id, semester: "Fall", year: 2017)
term53 = Term.create(plan_id: plan2.id, semester: "Spring", year: 2018)
term63 = Term.create(plan_id: plan2.id, semester: "Summer", year: 2018)
term73 = Term.create(plan_id: plan2.id, semester: "Fall", year: 2018)
term83 = Term.create(plan_id: plan2.id, semester: "Spring", year: 2019)
term93 = Term.create(plan_id: plan2.id, semester: "Summer", year: 2019)
term103 = Term.create(plan_id: plan2.id, semester: "Fall", year: 2019)
term113 = Term.create(plan_id: plan2.id, semester: "Spring", year: 2020)
term123 = Term.create(plan_id: plan2.id, semester: "Summer", year: 2020)

#give joe some courses
course1 = Course.create(name: "C++ Programming", course_id: "CS-1210", credits: 3, description: "Description", course_type: "GenEd")
course2 = Course.create(name: "Object Oriented Design", course_id: "CS-1220", credits: 3, description: "Description", course_type: "Major")
course3 = Course.create(name: "Java Programming", course_id: "CS-2210", credits: 3, description: "Description", course_type: "Major")
course11 = Course.create(name: "History of Potato", course_id: "PO-1210", credits: 3, description: "Description", course_type: "GenEd")
course21 = Course.create(name: "Calc I", course_id: "MATH-17100", credits: 5, description: "Description", course_type: "GenEd")
course31 = Course.create(name: "Algorithms", course_id: "CS-3410", credits: 3, description: "Description", course_type: "Major")
course12 = Course.create(name: "Compiler", course_id: "CS-3510", credits: 3, description: "Description", course_type: "Track")
course22 = Course.create(name: "Computer Architecture", course_id: "ENCP-3210", credits: 3, description: "Description", course_type: "Track")
course32 = Course.create(name: "Computer Graphics", course_id: "CS-4710", credits: 3, description: "Description", course_type: "Track")
course14 = Course.create(name: "Databases", course_id: "CS-3610", credits: 3, description: "Description", course_type: "Major")
course24 = Course.create(name: "DLD", course_id: "ENCP-1010", credits: 3, description: "Description", course_type: "GenEd")
course34 = Course.create(name: "O/S", course_id: "CS-3220", credits: 3, description: "Description", course_type: "Major")
course15 = Course.create(name: "Parallel Computing", course_id: "CS-4410", credits: 3, description: "Description", course_type: "GenEd")
course25 = Course.create(name: "Software Engineering I", course_id: "CS-4810", credits: 3, description: "Description", course_type: "Major")
course35 = Course.create(name: "Software Engineering II", course_id: "CS-4820", credits: 3, description: "Description", course_type: "Major")

#stick 'em together
TermCourse.create(term_id: term1.id, course_id: course1.id)
TermCourse.create(term_id: term1.id, course_id: course2.id)
TermCourse.create(term_id: term2.id, course_id: course3.id)
TermCourse.create(term_id: term2.id, course_id: course11.id)
TermCourse.create(term_id: term4.id, course_id: course21.id)
TermCourse.create(term_id: term4.id, course_id: course31.id)
TermCourse.create(term_id: term5.id, course_id: course12.id)
TermCourse.create(term_id: term7.id, course_id: course22.id)
TermCourse.create(term_id: term8.id, course_id: course32.id)
TermCourse.create(term_id: term10.id, course_id: course14.id)
TermCourse.create(term_id: term11.id, course_id: course24.id)
TermCourse.create(term_id: term5.id, course_id: course34.id)
TermCourse.create(term_id: term7.id, course_id: course15.id)
TermCourse.create(term_id: term10.id, course_id: course25.id)
TermCourse.create(term_id: term11.id, course_id: course35.id)

# same as Plan1 but missing GenEd "History of Potato"
TermCourse.create(term_id: term13.id, course_id: course1.id)
TermCourse.create(term_id: term13.id, course_id: course2.id)
TermCourse.create(term_id: term23.id, course_id: course3.id)
#Die, Potato!
TermCourse.create(term_id: term43.id, course_id: course21.id)
TermCourse.create(term_id: term43.id, course_id: course31.id)
TermCourse.create(term_id: term53.id, course_id: course12.id)
TermCourse.create(term_id: term73.id, course_id: course22.id)
TermCourse.create(term_id: term83.id, course_id: course32.id)
TermCourse.create(term_id: term103.id, course_id: course14.id)
TermCourse.create(term_id: term113.id, course_id: course24.id)
TermCourse.create(term_id: term53.id, course_id: course34.id)
TermCourse.create(term_id: term73.id, course_id: course15.id)
TermCourse.create(term_id: term103.id, course_id: course25.id)
TermCourse.create(term_id: term113.id, course_id: course35.id)

#extraneous users
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

user7 = User.new
user7.login = "jerry"
user7.email = "mrmcawesome@gmail.com"
user7.password = "password"
user7.password_confirmation = "password"
user7.roles << student
user7.save!

#make some plans
Plan.create(user_id: user2.id, name: "Test")
Plan.create(user_id: user2.id, name: "NoTest")
Plan.create(user_id: user3.id, name: "ShowOff")
Plan.create(user_id: user4.id, name: "iss43_v2")
Plan.create(user_id: user5.id, name: "CUFriday")
Plan.create(user_id: user6.id, name: "dummy")

