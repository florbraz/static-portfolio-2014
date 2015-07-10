# memcached
package "memcached"

# memcache
php_pear "memcache" do
  action :install
end

service "memcached" do
  action :nothing
  supports :status => true, :start => true, :stop => true, :restart => true
end

template "/etc/memcached.conf" do
  source "memcached.conf.erb"
  owner "root"
  group "root"
  mode "0644"
  notifies :restart, resources(:service => "memcached"), :immediately
end

template "/etc/php5/apache2/conf.d/vdd_memcache.ini" do
  source "vdd_memcache.ini.erb"
  mode "0644"
  notifies :restart, "service[apache2]", :delayed
end
