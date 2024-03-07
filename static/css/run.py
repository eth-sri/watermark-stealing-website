with open("in.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        line = line.strip()
        line=line.replace("style=\"color:#000000\"", 'class="chat-black1"')
        line=line.replace("style=\"color:#777777\"", 'class="chat-black2"')
        line=line.replace("style=\"color:#880000\"", 'class="chat-red1"')
        line=line.replace("style=\"color:#FF0000\"", 'class="chat-red2"')
        line=line.replace("style=\"color:#008000\"", 'class="chat-green1"')
        line=line.replace("style=\"color:#03ad55\"", 'class="chat-green2"')
        print(line)