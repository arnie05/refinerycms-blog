class AddPictureToBlogPosts < ActiveRecord::Migration[4.2]
  def change
    add_column :refinery_blog_posts, :picture_id, :integer
  end
end

