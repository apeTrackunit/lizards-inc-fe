FROM ubuntu:latest

# Username and password for the dev account
ARG USERNAME=dev
ARG PASSWORD=12345

# Install SSH server
RUN apt update && apt install openssh-server sudo -y
RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1000 $USERNAME 
RUN echo "$USERNAME:$PASSWORD" | chpasswd
RUN service ssh start
EXPOSE 22
# SSH is listening on this port


# Install Node, Npm and Git
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt install nodejs -y
RUN npm --version # just to be sure npm is installed
RUN apt install git -y

WORKDIR /app
COPY . .

RUN chmod -R u+w /app # Add write permission for the app folder
RUN chown -R $USERNAME /app # Transfer the owner rights of the app folder from the root to the user

# Expose the development port
EXPOSE 4200

# Start the ssh server
CMD ["/usr/sbin/sshd","-D"]