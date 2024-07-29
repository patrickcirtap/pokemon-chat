# pokemon-chat

A Pokémon-themed chat application, inspired by the GameBoy Color Generation 2 Pokémon style. Users can select an available Pokémon and join the group chat to exchange messages.

The application is a Java WebSocket server, served in the Tomcat servlet (version 9). The frontend uses plain HTML, CSS, JavaScript.

## Deployment

1. Ensure Tomcat is running on the system
- `systemctl status tomcat`

2. Build the project
- `cd pokemon-chat/`
- `mvn clean package`

3. Deploy to Tomcat
`cp target/pokemon-chat.war /opt/tomcat/webapps/`

4. Access the application
- `http://localhost:8080/pokemon-chat/`

See `demo.mp4` for a demonstration video.
