class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  before_create :default_role

  has_many(:plans)
  has_many(:assignments)
  has_many :roles, through: :assignments

  def role?(role)
    roles.any? { |r| r.name.underscore.to_sym == role }
  end

  def default_role
    if roles.empty?
      role = Role.find_by(name: "student")
      self.roles << role
    end
  end
end
