<script lang="ts">
    const navItems = [
      { icon: "../../../static/schedule-icon.svg", label: "Schedules" },
      { icon: "../../../static/user_progress-icon.png", label: "User Progress" },
      { icon: "../../../static/subscription-icon.png", label: "Subscription", active: true },
      { icon: "../../../static/settings-icon.png", label: "Settings" }
    ];
  </script>
  
  <nav class="border-b">
    <ul class="flex justify-around p-0">
      {#each navItems as item}
        <li class="text-center cursor-pointer">
          <a 
            class="flex flex-col items-center p-2 rounded-lg transition-colors
            {item.active ? 'bg-mindanchor-light text-mindanchor-blue' : 'hover:bg-gray-100'}"
            href="#{item.label.toLowerCase()}"
          >
            <img src={item.icon} alt={item.label} class="w-6 h-6" />
            <span class="text-sm mt-1">{item.label}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  