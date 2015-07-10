if node["mysql"]["databases"]
	log "iniciando criacao de banco"
  node["mysql"]["databases"].each do |index,db_name|
    include_recipe "database::mysql"
	
	
	mysql_connection_info = {
      :host => "localhost",
      :username => "root",
      :password => node["mysql"]["server_root_password"]
    }
	
    mysql_database db_name do
      connection mysql_connection_info
      action :create
    end
   # mysql_database index do
   #   connection mysql_connection_info
   #   sql "source /tmp/#{index}.sql;"
   # end

  end
end
