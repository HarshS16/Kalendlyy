import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export function HoverTest() {
  return (
    <div className="p-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Hover me to test
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Test Hover Card</h4>
            <p className="text-sm text-muted-foreground">
              This is a test hover card to verify the functionality is working correctly.
            </p>
            <div className="flex items-center pt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <span className="text-xs text-muted-foreground">Hover card is visible!</span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
