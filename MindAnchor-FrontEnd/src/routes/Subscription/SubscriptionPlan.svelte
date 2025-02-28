<script lang="ts">
  const features = [
  {
    icon: "../../public/pie-chart-icon.png",
    text: "View your focus journey in an interactive pie chart with analysis on key improvements and distraction reductions."
  },
  {
    icon: "../../public/calendar-icon.png", // Replace with the actual path of your calendar image
    text: "Sort and track your progress over days, weeks, months, or years to identify trends."
  },
  {
    icon: "../../public/streak-icon.png", // Replace with the actual path of your trophy image
    text: "Earn streak badges and focus points to celebrate your productivity milestones."
  }
];


  const handlePayNow = () => {
    // Handle payment logic here
    console.log('Processing payment...');
  };
</script>

<div class="p-6 max-w-2xl mx-auto">
  <h2 class="text-xl font-bold mb-6">What to expect in the premium version?</h2>
  
  <div class="space-y-6 mb-8">
    {#each features as feature}
  <div class="flex items-start gap-4">
    <img src="{feature.icon}" alt="Feature Icon" class="w-8 h-8">
    <p class="text-gray-700">{feature.text}</p>
  </div>
     {/each}
    
  </div>

  <div class="bg-mindanchor-light rounded-lg p-6 text-center">
    <h3 class="text-2xl font-bold mb-2">Subscription Plan</h3>
    <div class="text-4xl font-bold mb-4">$0.99</div>
    <p class="text-gray-600 mb-6">
      to experience the premium version for a month!
    </p>
    <button
      on:click={handlePayNow}
      class="w-full bg-mindanchor-blue text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
    >
      Pay Now
    </button>
  </div>

  <div class="text-right mt-4">
    <a href="#rate" class="text-mindanchor-blue hover:underline">Rate MindAnchor</a>
  </div>
</div>