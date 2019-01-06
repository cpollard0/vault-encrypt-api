# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "pin/centos-6.9/virtualenv"
  config.vm.box_url = "https://artifactory.promnetwork.com/artifactory/vagrant-local/pin/centos-6.9/virtualenv/metadata.json"
  config.vm.synced_folder ".", "/vagrant"
  if Vagrant::Util::Platform.windows?
    config.vm.synced_folder ".", "/vagrant", mount_options: ["dmode=0775", "fmode=0664"]
  end
  config.vm.provision "shell", inline: "/usr/local/bin/pip2.7 install --upgrade pip"
  config.vm.provision "shell", inline: "/usr/local/bin/pip2.7 install -r /vagrant/requirements.txt"
end
