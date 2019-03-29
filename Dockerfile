FROM indigodatacloudapps/ambertools-oneclient18
MAINTAINER Andrea Giachetti <giachetti@cerm.unifi.it>
LABEL description="Container image to run AmberTools v16. Installed Oneclient"

ENV ONECLIENT_PROVIDER_HOSTNAME=PROVIDER2
ENV ONECLIENT_AUTHORIZATION_TOKEN='TOKEN1'
ENV MOUNT_POINT=/tmp/onedata
ENV WANIP=wanip1
ENV SECHASH=sechash1
RUN mkdir /tmp/onedata
WORKDIR /opt/mds2/
RUN git clone https://github.com/andreagia/webclientdyn.git
WORKDIR /opt/mds2/webclientdyn
#RUN echo "login.token=$SECHASH" > ./src/main/webapp/resources/application.properties
RUN keytool -genkey -alias jetty -keyalg RSA -keystore ./jetty.keystore -storepass secret -keypass secret -dname "CN=$WANIP"
CMD mvn jetty:run